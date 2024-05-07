import { app } from "@/config/firebase";
import {
  getDocs,
  where,
  addDoc,
  collection,
  getFirestore,
  query,
  limit,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

export interface IpLogger {
  path: string;
  link: string;
}

export interface Victim {
  ip: string;
  userAgent: string;
  createdAt?: Timestamp;
  logger_id?: string;
}

export default class IpLoggerService {
  COLLECTION = "loggers";
  VICTIM_COLLECTION = "victims";
  async createLogger(logger: IpLogger) {
    const db = getFirestore(app);
    return addDoc(collection(db, this.COLLECTION), logger);
  }

  async associateVictimToReference(path: string, { ip, userAgent }: Victim) {
    const db = getFirestore(app);
    const logger = await this.getLoggerByPath(path);

    const docRef = await addDoc(collection(db, this.VICTIM_COLLECTION), {
      ip,
      userAgent,
      createdAt: new Date(),
      logger_id: logger.id,
    });

    return {
      logger,
      docRef,
    };
  }

  async getLoggerByPath(path: string) {
    const db = getFirestore(app);
    const q = query(collection(db, this.COLLECTION), where("path", "==", path));

    const snap = await getDocs(q);

    if (snap.empty) {
      throw new Error("Logger not found with path " + path);
    }

    return {
      id: snap.docs[0].id,
      data: snap.docs[0].data(),
    };
  }

  async viewVictimsForLogger(reference: string): Promise<Victim[]> {
    try {
      const db = getFirestore(app);
      const q = query(
        collection(db, this.VICTIM_COLLECTION),
        where("logger_id", "==", reference)
      );

      const querySnapshot = await getDocs(q);
      let victims: any[] = [];
      querySnapshot.forEach((doc) => {
        victims.push(doc.data());
      });

      return victims;
    } catch (error) {
      console.error("Error retrieving victims:", error);
      throw error;
    }
  }

  async viewLogger(reference: string) {
    const db = getFirestore(app);
    const docRef = doc(db, this.COLLECTION, reference);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        data: docSnap.data(),
      };
    }

    return undefined;
  }
}
