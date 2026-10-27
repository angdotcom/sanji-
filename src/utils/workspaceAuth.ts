/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Workspace sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutUser = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Google Sheets integration helper
export const syncToGoogleSheet = async (accessToken: string, registrationData: { playerTag: string; email: string; region: string; hero: string }) => {
  // 1. Create a spreadsheet if not already created, or append row
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'MLBB Mythic Arena Pre-Registrations 2026'
      }
    })
  });
  
  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${err}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;

  // Append header and row
  const appendRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:E1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [
        ['Timestamp', 'Player Tag', 'Email', 'Region', 'Selected Hero'],
        [new Date().toISOString(), registrationData.playerTag, registrationData.email, registrationData.region, registrationData.hero]
      ]
    })
  });

  if (!appendRes.ok) {
    throw new Error('Failed to append data to Google Sheet');
  }

  return { spreadsheetId, spreadsheetUrl: sheetData.spreadsheetUrl };
};

// Google Drive integration helper
export const saveToGoogleDrive = async (accessToken: string, registrationData: { playerTag: string; email: string; voucher: string }) => {
  const fileContent = JSON.stringify({
    app: "Mobile Legends: Bang Bang — Mythic Arena",
    enlistedAt: new Date().toISOString(),
    ...registrationData
  }, null, 2);

  const metadata = {
    name: `MLBB_Mythic_Pass_${registrationData.playerTag.replace(/\s+/g, '_')}.json`,
    mimeType: 'application/json'
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([fileContent], { type: 'application/json' }));

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: form
  });

  if (!res.ok) {
    throw new Error('Failed to save pass to Google Drive');
  }

  return await res.json();
};

// Gmail integration helper
export const sendConfirmationEmail = async (accessToken: string, recipientEmail: string, voucherCode: string) => {
  const subject = "Welcome to MLBB Mythic Arena — Your Starter Voucher Inside!";
  const body = `Thank you for pre-registering for Mobile Legends: Bang Bang Mythic Arena!\n\nYour Starter Voucher Code is: ${voucherCode}\n\nRedeem it in-game at launch for your Mythic Hero Choice Chest and Epic Rewards.\n\nSee you in the Arena,\nMoonton Esports Team`;

  const emailLines = [
    `To: ${recipientEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    body
  ];

  const email = emailLines.join('\r\n');
  const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64EncodedEmail
    })
  });

  if (!res.ok) {
    throw new Error('Failed to send confirmation email via Gmail');
  }

  return await res.json();
};
