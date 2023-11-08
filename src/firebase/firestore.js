const { app } = require("./config");
const { getFirestore } = require("firebase/firestore");

export const db = getFirestore(app);
