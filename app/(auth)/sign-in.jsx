
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { signIn } from '../../lib/auth'; // Importez la fonction signIn

import { images } from '../../constants';

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      router.push("/home");
    } catch (error) {
      console.error(error);
       // Gérer les erreurs en fonction du code d'erreur
    switch (error.code) {
      case "auth/invalid-email":
        alert("Adrès imel la pa valab. Tanpri verifye epi eseye ankò.");
        break;

      case "auth/user-not-found":
        alert("Pa gen itilizatè ki koresponn ak adrès imel sa a.");
        break;

      case "auth/wrong-password":
        alert("Modpas la pa kòrèk. Tanpri eseye ankò.");
        break;

      case "auth/network-request-failed":
        alert("Erè rezo. Tanpri verifye koneksyon ou epi eseye ankò.");
        break;

      case "auth/too-many-requests":
        alert("Twòp tantativ echwe. Tanpri eseye ankò pita.");
        break;

      default:
        alert("Yon erè enkoni rive. Tanpri eseye ankò.");
        break;
    }
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
            source={images.logo} resizeMode="contain" 
            style={styles.logo}
             />
          </View>
          <Text style={styles.title}>Antre nan MòpyonCash</Text>

          <FormField
            title="Adrès Imèl"
            value={form.email}
            handlechangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            otherStyles={styles.formField}
            placeHolder="Antre adrès imèl"
          />

          <FormField
            title="Paswòd"
            value={form.password}
            handlechangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
            secureTextEntry
            placeHolder="Antre paswòd"
          />

          <CustomButton
            title="Konekte"
            handlePress={submit}
            containerStyles={styles.submitButton}
            isLoading={submitting}
          />

          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 12 }}>
            <Text style={{ fontFamily: "Poppins-Regular" }}>Ou bliye paswòd ou?</Text>
          </View>

          <CustomButton
            title="Kreye yon nouvo kont"
            handlePress={() => router.push("/sign-up")}
            containerStyles={styles.newAccountButton}
            textStyle={{ color: "#66B22E" }}
            isLoading={submitting}
          />
        </View>
      </ScrollView>
      <StatusBar style='light' backgroundColor="#245154" />
    </SafeAreaView>
  );
};

export default SignIn;


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
  newAccountButton: {
    marginTop: 20,
    backgroundColor: "#ECEBED",
    borderColor: "#66B22E",
    borderWidth: 2,
    width: '100%'

  },
  
});




