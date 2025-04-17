import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebaseConfig';
import { avatar } from '../constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: '',
    userName: '',
    email: '',
    balance: 0,
    selectedAvatar: 0,
    avatars: [
            { id: 0, avatar: 'default' },
            { id: 1, avatar: avatar.Batman },
            { id: 2, avatar: avatar.Gojo },
            { id: 3, avatar: avatar.Hinata },
            { id: 4, avatar: avatar.Itachi },
            { id: 5, avatar: avatar.Kakashi },
            { id: 6, avatar: avatar.Light },
            { id: 7, avatar: avatar.Livai },
            { id: 8, avatar: avatar.Madara },
            { id: 9, avatar: avatar.Me },
            { id: 10, avatar: avatar.Naruto },
            { id: 11, avatar: avatar.Pain },
            { id: 12, avatar: avatar.Sakura },
            { id: 13, avatar: avatar.Sasuke },
            { id: 14, avatar: avatar.Shikamaru },
            { id: 15, avatar: avatar.Shoto },
            { id: 16, avatar: avatar.Yuijiro },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          
          // Écouteur en temps réel pour les mises à jour
          const unsubscribeUserDoc = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const fetchedUserData = doc.data();
              
              // Merge des données de Firestore avec la structure existante
              setUserData(prev => ({
                ...prev,
                id: user.uid,
                username: fetchedUserData.userName || prev.username,
                email: fetchedUserData.email || prev.email,
                balance: fetchedUserData.balance ?? prev.balance,
                selectedAvatar: fetchedUserData.selectedAvatar ?? prev.selectedAvatar
              }));
              
              setIsLogged(true);
              setLoading(false);
            } else {
              // Gestion du cas où le document n'existe pas
              console.warn('Aucune donnée utilisateur trouvée');
              setIsLogged(false);
              setLoading(false);
            }
          }, (error) => {
            console.error('Erreur de suivi des données utilisateur', error);
            setLoading(false);
          });

          // Retourne la fonction de désabonnement
          return () => unsubscribeUserDoc();
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur', error);
          setLoading(false);
        }
      } else {
        // Réinitialisation des données utilisateur
        setUserData(prev => ({
          id: '',
          userName: '',
          email: '',
          balance: 0,
          selectedAvatar: 0,
          avatars: prev.avatars
        }));
        setIsLogged(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Méthodes de mise à jour avec validation et gestion d'erreurs
  const updateUsername = async (newUsername) => {
    if (!userData.id) throw new Error('Utilisateur non connecté');
    
    try {
      // Validation côté client
      if (!newUsername || newUsername.trim().length < 3) {
        throw new Error('Le nom d\'utilisateur doit contenir au moins 3 caractères');
      }

      const userDocRef = doc(db, 'users', userData.id);
      await updateDoc(userDocRef, { userName: newUsername.trim() });
      
      // Mise à jour optionnelle du state local
      setUserData(prev => ({
        ...prev,
        userName: newUsername.trim()
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom', error);
      throw error;
    }
  };

  const updateBalance = async (newBalance) => {
    if (!userData.id) throw new Error('Utilisateur non connecté');
    
    try {
      // Validation du solde
      if (newBalance < 0) {
        throw new Error('Le solde ne peut pas être négatif');
      }

      const userDocRef = doc(db, 'users', userData.id);
      await updateDoc(userDocRef, { balance: newBalance });
      
      // Mise à jour optionnelle du state local
      setUserData(prev => ({
        ...prev,
        balance: newBalance
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du solde', error);
      throw error;
    }
  };

  const updateAvatar = async (newAvatarId) => {
    if (!userData.id) throw new Error('Utilisateur non connecté');
    
    try {
      // Validation de l'avatar
      const validAvatarIds = userData.avatars.map(a => a.id);
      if (!validAvatarIds.includes(newAvatarId)) {
        throw new Error('Avatar sélectionné invalide');
      }

      const userDocRef = doc(db, 'users', userData.id);
      await updateDoc(userDocRef, { selectedAvatar: newAvatarId });
      
      // Mise à jour optionnelle du state local
      setUserData(prev => ({
        ...prev,
        selectedAvatar: newAvatarId
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avatar', error);
      throw error;
    }
  };

  // Méthode pour récupérer manuellement les données utilisateur
  const fetchUserData = async () => {
    if (!userData.id) return null;

    try {
      const userDocRef = doc(db, 'users', userData.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        setUserData(prev => ({
          ...prev,
          ...fetchedData
        }));
        return fetchedData;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération manuelle des données', error);
      return null;
    }
  };

  return (
    <UserContext.Provider 
      value={{
        userData,
        updateUsername,
        updateBalance,
        updateAvatar,
        fetchUserData,
        loading,
        isLogged
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
};












