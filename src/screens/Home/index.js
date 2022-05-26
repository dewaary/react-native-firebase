import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
Icon.loadFont();
import {getDatabase, ref, onValue} from 'firebase/database';
import {CardContact} from '../../components';
import FIREBASE from '../../config/FIREBASE';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: {},
      contactsKey: [],
    };
  }

  componentDidMount() {
    this.getDataContact();
  }

  getDataContact = () => {
    // FIREBASE.database()
    //   .ref('Contact')
    //   .once('value', querySnapShot => {
    //     let data = querySnapShot.val() ? querySnapShot.val : [];
    //     let ContactItem = {...data};
    //     console.log('ini contact item', ContactItem);

    //     this.setState({
    //       contacts: ContactItem,
    //       contactsKey: Object.keys(ContactItem),
    //     });
    //   });

    const db = getDatabase();
    const starCountRef = ref(db, 'Contact');
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      const ContactItem = {...data};

      this.setState({
        contacts: ContactItem,
        contactsKey: Object.keys(ContactItem),
      });
    });
  };

  removeData = id => {
    Alert.alert('Info', 'Are Sure Deleted Data Contact', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          FIREBASE.database()
            .ref('Contact/' + id)
            .remove();

          Alert.alert('Delete', 'Deleting data success');
        },
      },
    ]);
  };

  render() {
    const {contacts, contactsKey} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Contact</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.listContact}>
          {contactsKey.length > 0 ? (
            contactsKey.map(key => (
              <CardContact
                key={key}
                ContactItem={contacts[key]}
                id={key}
                {...this.props}
                removeData={this.removeData}
              />
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnCreate}
            onPress={() => this.props.navigation.navigate('CreateContact')}>
            <Icon name="plus" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  separator: {
    borderWidth: 1,
    marginTop: 10,
  },
  listContact: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 50,
  },
  btnCreate: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
