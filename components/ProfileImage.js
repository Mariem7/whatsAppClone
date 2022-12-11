import React , { useState } from  'react';
import { Image, View,StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import userImage from '../assets/images/userImage.jpeg';
import colors from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { launchImagePicker, uploadImageAsync } from '../utils/imagePickerHelper';
import { updatedSignInUserData } from '../utils/actions/authActions';
import { updateLoggedInUserData } from '../store/authSlice';

const ProfileImage = props => {

    const dispatch = useDispatch();
    //if we have a current image in the database, then use it, then image the default image
    const source = props.uri ?  { uri: props.uri } : userImage;
    const [image, setImage] = useState(source);
    const [isLoading, setIsLoading] = useState(false);

    const showEditButton = props.showEditButton && props.showEditButton === true;

    const userId = props.userId;

    const pickImage = async ()=>{
        try {
            const tempUri = await launchImagePicker();

            //Upload the image
            setIsLoading(true);
            const uploadUrl = await uploadImageAsync(tempUri);
            setIsLoading(false);
            if( !uploadUrl){
                throw new Error("Could not upload image");
            }

            const newData = {profilePicture: uploadUrl}

            await updatedSignInUserData(userId, newData );
            dispatch(updateLoggedInUserData({newData}));

            //Set the image
            setImage({uri: uploadUrl})
        } 
        catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }
 
    const Container = showEditButton ? TouchableOpacity : View;
    return (
        <Container onPress={pickImage}>

            {
                isLoading ?
                <View height={props.size} width={props.size} style={styles.loadingContainer}>
                    <ActivityIndicator size={'small'} color={colors.primary} />
                </View> :
                 <Image
                 style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
                 source={image} />
            }
            
            {
                showEditButton && !isLoading && 
                <View style={styles.editIconContainer}>
                <FontAwesome name="pencil" size={15} color="black" />
                </View>
            }
            
        </Container>
    )
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        borderColor: colors.grey,
        borderWidth: 1
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        padding: 8
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileImage;