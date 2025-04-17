import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
   
} from 'firebase/firestore';


import { signUp } from '../../lib/auth';
import { db } from '../../lib/firebaseConfig';
import { images, avatar } from '../../constants';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { useUser } from '../../contexts/UserContext';

const SignUp = () => {
  const { userData } = useUser();
  const { balance, selectedAvatar } = userData;

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Validation du nom d'utilisateur
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
  };

  // Vérifier si le nom d'utilisateur existe
  const isUsernameTaken = async (userName) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const submit = async () => {
    // Validation des champs
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Erreur", "Tanpri ranpli tout bòl yo");
      return;
    }

    // Validation du nom d'utilisateur
    if (!validateUsername(form.userName)) {
      Alert.alert("Erreur", "Non itilizatè pa valid. 3-16 karaktè, lèt oswa nimewo");
      return;
    }

    setSubmitting(true);

    try {
      // Vérifier si le nom d'utilisateur existe
      const usernameExists = await isUsernameTaken(form.userName);
      if (usernameExists) {
        Alert.alert("Erreur", "Non itilizatè sa deja itilize. Chwazi yon lòt non.");
        setSubmitting(false);
        return;
      }
  
      // Données utilisateur à ajouter
      const additionalUserData = {
        userName: form.userName,
        balance: balance,
        selectedAvatar: selectedAvatar,
        
      };
  
      // Inscription Firebase avec données supplémentaires
      const user = await signUp(form.email, form.password, additionalUserData);
  
      Alert.alert("Siksè", "Enskri avèk siksè!");
      router.push("/home");
    } catch (error) {
      console.error("Détails complets de l'erreur:", error);
      console.error("Code d'erreur:", error.code);
      console.error("Message d'erreur:", error.message);
      console.error("Nom de l'erreur:", error.name);
      console.error("Pile d'erreur:", error.stack);

        // Détails supplémentaires si disponibles
      if (error.serverResponse) {
        console.error("Réponse du serveur:", JSON.stringify(error.serverResponse));
      }
      
      // Gestion des erreurs Firebase
      const errorCode = error.code;
      let errorMessage = "Genyen yon pwoblèm pandan enskripsyon an";
  
      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage = "Adrès imèl sa deja itilize";
          break;
        case "auth/invalid-email":
          errorMessage = "Adrès imèl pa valid";
          break;
        case "auth/weak-password":
          errorMessage = "Paswòd la trò fèb";
          break;
      }
  
      Alert.alert("Erreur", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Enskri nan MòpyonCash</Text>

          <FormField
            title="Non Itilizatè"
            value={form.userName}
            handlechangeText={(text) => setForm(prev => ({ ...prev, userName: text }))}
            otherStyles={styles.formField}
            placeHolder="Antre non itilizatè"
          />

          <FormField
            title="Adrès Imèl"
            value={form.email}
            handlechangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            otherStyles={styles.formField}
            placeHolder="Antre adrès imèl"
          />

          <FormField
            title="Paswòd"
            value={form.password}
            handlechangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
            otherStyles={styles.formField}
            secureTextEntry
            placeHolder="Antre paswòd"
          />

          <CustomButton
            title="Enskri"
            handlePress={submit}
            containerStyles={styles.submitButton}
            isLoading={submitting}
          />

          <View style={styles.loginLinkContainer}>
            <Text style={styles.bottomText}>Ou deja genyen yon kont?</Text>
            <Link href="/sign-in" style={styles.loginLink}>
              Konekte
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#ECEBED" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ECEBED"
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 165, 
    height: 84
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#245154',
    marginBottom: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: 'center'
  },
  formField: {
    marginTop: 10,
    width: '100%'
  },
  submitButton: {
    marginTop: 20,
    width: '100%'
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8
  },
  bottomText: {
    fontSize: 16,
    color: 'black',
    fontFamily: "Poppins-Regular"
  },
  loginLink: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: '#66B22E'
  }
});

export default SignUp;




