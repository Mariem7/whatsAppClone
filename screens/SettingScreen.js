import React, { useCallback, useReducer, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PageTitle from '../components/PageTitle';
import { Feather, FontAwesome } from '@expo/vector-icons';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import SubmitButton from '../components/SubmitButton';
import colors from '../constants/colors';
import { updatedSignInUserData } from '../utils/actions/authActions';
import { userLogout } from './../utils/actions/authActions';

const SettingScreen = props => {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  //getting the user data from asyncStorage
  const userData = useSelector(state => state.auth.userData);
  
  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const email = userData.email || "";
  const about = userData.about || "";

  const initialState = {
      inputValues: {
          firstName,
          lastName,
          email,
          about,
      },
      inputValidities: {
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          about: undefined,
      },
      formIsValid: false
  }

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback((inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue })
  }, [dispatchFormState]);

  //method to save changes 
  const saveHandler = async () =>{
    //get the updated values
    const updatedValues = formState.inputValues;
    try {
        setIsLoading(true);
        await updatedSignInUserData(userData.userId,updatedValues);
        dispatch()
    } catch (error) {
        
    }
    finally{
        setIsLoading(false);
    }
    
  }



    return <View style={styles.container}>
        <PageTitle text="Settings" />
        <Input
                id="firstName"
                label="First name"
                icon="user-o"
                iconPack={FontAwesome}
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={formState.inputValidities["firstName"]}
                initialValue={userData.firstName} />

            <Input
                id="lastName"
                label="Last name"
                icon="user-o"
                iconPack={FontAwesome}
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={formState.inputValidities["lastName"]}
                initialValue={userData.lastName} />

            <Input
                id="email"
                label="Email"
                icon="mail"
                iconPack={Feather}
                onInputChanged={inputChangedHandler}
                keyboardType="email-address"
                autoCapitalize="none"
                errorText={formState.inputValidities["email"]}
                initialValue={userData.email} />

            <Input
                id="about"
                label="About"
                icon="user-o"
                iconPack={FontAwesome}
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={formState.inputValidities["about"]}
                initialValue={userData.about} />

                {
                    isLoading ? 
                    <ActivityIndicator size={'small'} color={colors.red} style = {{marginTop: 10}} /> : 
                    <SubmitButton
                    title="Save changes"
                    onPress={saveHandler}
                    style={{ marginTop: 20 }}
                    disabled={!formState.formIsValid}/>
                }

            <SubmitButton
            title=" Logout"
            onPress={() => dispatch(userLogout())}
            style={{ marginTop: 20 }}
            color={colors.red} 
            />
    </View>
};


const styles = StyleSheet.create({
    container:{
      flex: 1,
      marginTop:10,
      marginLeft:20,
      marginRight:20
    }
  });

export default SettingScreen;