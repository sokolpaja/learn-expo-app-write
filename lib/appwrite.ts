import { RegisterUserPayload } from '@/types';
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.inova.aora',
  projectId: '66839993000015ab9e3c',
  databaseId: '66839af200310458e9a0',
  userCollectionsId: '66839b2e0033f192ce11',
  videoCollectionsId: '66839b470017fc6379f9',
  storageId: '66839f5e00207d54f9e7',
};

const client = new Client()
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserPayload) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log('🚀 ~ newAccount:', newAccount);
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionsId,
      ID.unique(),
      {
        account_id: newAccount.$id,
        email: email,
        username: username,
        avatar_url: avatarUrl,
      }
    );
    console.log('🚀 ~ newUser:', newUser);
    await login(email, password);
    return newUser;
  } catch (error: any) {
    console.log('🚀 ~ registerUser ~ error:', error);
    throw new Error(error);
  }
};

export async function login(email: string, password: string) {
  try {
    const sessions = await account.listSessions();
    console.log('🚀 ~ login ~ sessions:', sessions);
    if (sessions.sessions[0].providerUid === email) {
      return sessions.sessions[0];
    } else {
      const session = await account.createEmailPasswordSession(email, password);
      console.log('🚀 ~ login ~ session:', session);
      return session;
    }
  } catch (error: any) {
    console.log('🚀 ~ login ~ error:', error);
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.listSessions();
    console.log('🚀 ~ getAccount ~ currentAccount:', currentAccount);

    return currentAccount;
  } catch (error: any) {
    console.log('🚀 ~ getAccount ~ error:', error);
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    // if (!currentAccount) throw Error;

    // const currentUser = await databases.listDocuments(
    //   appWriteConfig.databaseId,
    //   appWriteConfig.userCollectionsId,
    //   [Query.equal('account_idd', currentAccount.$id)]
    // );

    // if (!currentUser) throw Error;

    // return currentUser.documents[0];
  } catch (error) {
    console.log('🚀 ~ getCurrentUser ~ error:', error);
    return null;
  }
}
