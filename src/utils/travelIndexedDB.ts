import { FormTravelData } from '@/@types/travelForm';

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TravelAppDatabase', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('TravelData')) {
        db.createObjectStore('TravelData', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveFormTravelData = async (data: FormTravelData, id: number) => {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('TravelData', 'readwrite');
    const store = transaction.objectStore('TravelData');
    const request = store.put({ id, ...data });
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      console.error('IndexedDB 저장 실패:', request.error);
      reject(request.error);
    };
  });
};

const getFormTravelData = async (
  id: number,
): Promise<FormTravelData | null> => {
  const db = await openDatabase();
  const transaction = db.transaction('TravelData', 'readonly');
  const store = transaction.objectStore('TravelData');

  const request = store.get(id);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const clearIndexedDB = async () => {
  const db = await openDatabase();
  const transaction = db.transaction('TravelData', 'readwrite');
  const store = transaction.objectStore('TravelData');

  store.clear();
};

const removeFormTravelData = async (id: number) => {
  const db = await openDatabase();
  const transaction = db.transaction('TravelData', 'readwrite');
  const store = transaction.objectStore('TravelData');

  store.delete(id);
};

export {
  saveFormTravelData,
  getFormTravelData,
  clearIndexedDB,
  removeFormTravelData,
};
