import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {getDatabase, ref, onValue} from 'firebase/database';

export class DetailContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: {},
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
    const starCountRef = ref(db, 'Contact/' + this.props.route.params.id);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      const ContactItem = {...data};

      this.setState({
        contacts: ContactItem,
      });
    });
  };

  render() {
    const {contacts} = this.state;
    return (
      <View style={styles.container}>
        <Text>Name :</Text>
        <Text style={styles.text}> {contacts.name}</Text>

        <Text>Phone Number :</Text>
        <Text style={styles.text}> {contacts.phone}</Text>

        <Text>Address :</Text>
        <Text style={styles.text}> {contacts.address}</Text>
      </View>
    );
  }
}

export default DetailContact;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
