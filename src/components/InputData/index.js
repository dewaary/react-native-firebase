import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';

const InputData = ({
  label,
  placeholder,
  keyboardType,
  isTextArea,
  onChangeText,
  nameState,
  value,
}) => {
  if (isTextArea) {
    return (
      <>
        <Text style={styles.name}>{label} : </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={placeholder}
          style={styles.textInputArea}
          keyboardType={keyboardType}
          value={value}
          onChangeText={text => onChangeText(nameState, text)}
        />
      </>
    );
  }

  return (
    <>
      <Text style={styles.name}>{label} : </Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={text => onChangeText(nameState, text)}
      />
    </>
  );
};

export default InputData;

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textInputArea: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
