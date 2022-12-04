import React, { useCallback, useReducer, useEffect, useState } from 'react';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { Feather } from '@expo/vector-icons';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../constants/colors';

//variable to test: using a default email and password
const isTestMode = true;

const initialState = {
    inputValues:{
        email: isTestMode ? "mariemneili7@gmail.com" : "",
        password: isTestMode ? "123456" : "", 
    },
    inputValidities: {
        email: isTestMode,
        password: isTestMode,
    },
    formIsValid: isTestMode
}

const SignInForm = props => {

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    //error variable
    const [error, setError] = useState();
    //loading variable
    const [isLoading, setIsLoading] = useState(false);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue })
    }, [dispatchFormState]);

    useEffect(() => {
        if(error){
            Alert.alert("An error occured", error);
        }
    }, [error])

    const authHandler = useCallback (async() =>{
        try {
            setIsLoading(true);
            const action = signIn(
                formState.inputValues.email,
                formState.inputValues.password,
            )
            setError(null);
            await dispatch(action);
            
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    }, [dispatch, formState]);

    return (
            <>
                <Input
                    id="email"
                    label="Email"
                    icon="mail"
                    iconPack={Feather}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onInputChanged={inputChangedHandler}
                    initialValue={formState.inputValues.email}
                    errorText={formState.inputValidities["email"]} />

                <Input
                    id="password"
                    label="Password"
                    icon="lock"
                    iconPack={Feather}
                    autoCapitalize="none"
                    secureTextEntry
                    onInputChanged={inputChangedHandler}
                    initialValue={formState.inputValues.password}
                    errorText={formState.inputValidities["password"]} />
                
                {
                    isLoading ? 
                    <ActivityIndicator size={'small'} color={colors.primary} style = {{marginTop: 10}} /> : 
                    <SubmitButton
                    title="Sign in"
                    onPress={authHandler}
                    style={{ marginTop: 20 }}
                    disabled={!formState.formIsValid}/>
                }

            </>
    )
};

export default SignInForm;