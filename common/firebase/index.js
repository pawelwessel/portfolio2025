import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY2,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN2,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID2,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET2,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID2,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID2,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID2,
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const db = getFirestore(app);

const storage = getStorage(app);

const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export async function pushSession(data) {
  const productDocRef = doc(collection(db, "sessions"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function pushAssistantMessage(data) {
  const productDocRef = doc(collection(db, "assistantMessages"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}

export async function getPublicSessions() {
  const productDocRef = collection(db, "publicSessions");
  const querySnapshot = await getDocs(productDocRef);
  const sessions = [];
  querySnapshot.forEach((doc) => {
    sessions.push({ ...doc.data(), id: doc.id });
  });
  return sessions;
}
export async function pushSessionMessage(data, sessionId) {
  const productDocRef = doc(collection(db, "publicSessions"), sessionId);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const newData = {
      ...currentData,
      messages: [...currentData.messages, data],
    };
    await updateDoc(productDocRef, newData);
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
      messages: [data],
    });
    return productDocRef;
  }
}
export async function createSession(data) {
  const productDocRef = doc(collection(db, "publicSessions"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      messages: [],
    });
    return productDocRef;
  }
}

export async function getAssistantMessages() {
  try {
    const leadsRef = collection(db, "assistantMessages");
    const leadsSnapshot = await getDocs(leadsRef);
    const leads = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      leads.push(lead);
    });

    return leads;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}

export async function pushSecondLead(data) {
  const productDocRef = doc(collection(db, "secondLeads"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getDocument(collectionName, key) {
  try {
    const docRef = doc(db, collectionName, key);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.warn(`Document ${key} not found in collection ${collectionName}`);
      return null;
    }
  } catch (error) {
    console.warn(
      `Error fetching document ${key} from ${collectionName}:`,
      error
    );
    return null;
  }
}
export async function getDocuments(collectionName) {
  try {
    const ref = collection(db, collectionName);
    const response = await getDocs(ref);
    const res = response.docs.map((doc) => doc.data());
    return res;
  } catch (error) {
    console.warn(`Error fetching documents from ${collectionName}:`, error);
    // Return empty array as fallback during build time
    return [];
  }
}
export async function getBlogPosts() {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
export async function addBlogPost(post) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.data()) {
    await setDoc(doc(db, "blog", "blog"), { posts: [post] });
  } else {
    await updateDoc(doc(db, "blog", "blog"), {
      posts: arrayUnion(post),
    });
  }
}
async function updateBlogPost(postId, updatedPost) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

//auto blogger
//product === generated blog post

export async function createDraft(productConfig, customId) {
  const draftDocRef = doc(collection(db, "drafts"), customId);

  const docSnap = await getDoc(draftDocRef);
  if (docSnap.exists()) {
    // Document with customId already exists, do not create a new one
    return draftDocRef;
  } else {
    await setDoc(draftDocRef, {
      ...productConfig,
      createdAt: Date.now(),
    });
    return draftDocRef;
  }
}
export async function deleteBlogPost(postId) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      await updateDoc(docRef, { posts });
    }
  }
}

export async function getDrafts() {
  const querySnapshot = await getDocs(collection(db, "drafts"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  const draftDoc = await getDoc(draftDocRef);
  return draftDoc.exists() ? { ...draftDoc.data(), id: draftDoc.id } : null;
}

export async function updateDraft(draftId, updates) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await updateDoc(draftDocRef, updates);
}

export async function deleteDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await deleteDoc(draftDocRef);
}

export async function deleteMultipleDrafts(draftIds) {
  const promises = draftIds.map(async (draftId) => {
    const draftDocRef = doc(db, "drafts", draftId);
    await deleteDoc(draftDocRef);
  });
  await Promise.all(promises);
}

export async function deleteMultipleProducts(productIds) {
  const promises = productIds.map(async (productId) => {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
  });
  await Promise.all(promises);
}

export async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}
export async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(doc(db, collectionName, uniqueId));
}
export async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  const existingData = docSnapshot.data();
  const updatedData = { ...existingData };
  keys.forEach((key, index) => {
    updatedData[key] = values[index];
  });
  await updateDoc(docRef, updatedData);
}
export async function getSecondLeads() {
  try {
    const leadsRef = collection(db, "secondLeads");
    const leadsSnapshot = await getDocs(leadsRef);
    const leads = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      leads.push(lead);
    });

    return leads;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}
export async function pushLead(data) {
  const productDocRef = doc(collection(db, "leads"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function pushMessage(data) {
  const productDocRef = doc(collection(db, "messages"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getLeads() {
  try {
    const leadsRef = collection(db, "leads");
    const leadsSnapshot = await getDocs(leadsRef);
    const leads = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      leads.push(lead);
    });

    return leads;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}
export async function getMessages() {
  try {
    const leadsRef = collection(db, "messages");
    const leadsSnapshot = await getDocs(leadsRef);
    const messages = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      messages.push(lead);
    });

    return messages;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}
export async function updateMessage(id, data) {
  const docRef = doc(collection(db, "messages"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function updateSecondLead(id, data) {
  const docRef = doc(collection(db, "secondLeads"), id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function deleteSecondLead(id) {
  const docRef = doc(collection(db, "secondLeads"), id);
  await deleteDoc(docRef);
  return docRef;
}
export async function updateLead(id, data) {
  const docRef = doc(collection(db, "leads"), id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function deleteLead(id) {
  const docRef = doc(collection(db, "leads"), id);
  await deleteDoc(docRef);
  return docRef;
}
export async function updateApplication(id, data) {
  const docRef = doc(collection(db, "employees"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function updateCourse(id, data) {
  const docRef = doc(collection(db, "courses"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function pushCourse(data) {
  const productDocRef = doc(collection(db, "courses"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function pushEmployee(data) {
  const productDocRef = doc(collection(db, "employees"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getLinks() {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = [];

  linksSnapshot.forEach((doc) => {
    const link = doc.data();
    link.id = doc.id;
    links.push(link);
  });

  return links;
}
export async function getLinksById(id) {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = [];

  linksSnapshot.forEach((doc) => {
    const link = doc.data();
    link.id = doc.id;
    links.push(link);
  });

  return links.find((link) => link.id === id);
}
export async function getInviteById(id) {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = linksSnapshot.docs.map((doc) => doc.data());
  const datas = links.map((link) => link.data);
  return datas[0]?.filter((link) => link.link.includes(id))[0];
}
export async function pushLinks(data) {
  const linkDocRef = doc(collection(db, "links"), data.id);
  await setDoc(linkDocRef, {
    ...data,
    createdAt: Date.now(),
  });
  return linkDocRef;
}
export async function fetchLinks() {
  const linksRef = collection(db, "links");
  const querySnapshot = await getDocs(linksRef);
  const links = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return links;
}

function replaceById(array, newObj) {
  return array?.map((item) =>
    item.link.includes(newObj.link) ? newObj : item
  );
}

export async function updateLink(linkId, updatedLink) {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = linksSnapshot.docs
    .map((doc) => doc.data())
    .filter((link) => link.data.some((l) => l.link.includes(linkId)));
  let newObject = {
    link: `https://hexon.work/invite/${linkId}`,
    ...updatedLink,
  };

  let updatedArray = replaceById(links[0]?.data, newObject);

  await updateDoc(doc(db, "links", links[0]?.id), {
    data: updatedArray,
  });
}

export async function deleteLink(id) {
  await deleteDoc(doc(db, "links", id));
}

export { provider, storage, auth, app };
