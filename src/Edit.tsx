import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { store } from "./provider/store";
import { COMPLETE_ONE_TODO, PENDING_ONE_TODO, UPDATE_ONE_TODO } from "./provider/action";
import { useState } from "react";

function Edit({ navigation, route }: any) {
    const [todo, setTodo]: any = useState(route?.params?.todo || "");

    const handleTodoComplete = () => {
        store.dispatch({ type: COMPLETE_ONE_TODO, id: route?.params?.id });
        navigation.pop()
    }

    const handleUpdateTodo = () => {
        store.dispatch({ type: UPDATE_ONE_TODO, data: { ...route.params, todo } });
        navigation.pop()
    }

    const handleTodoAgain = () => {
        store.dispatch({ type: PENDING_ONE_TODO, id: route?.params?.id });
        navigation.pop()
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: '#fff',
        }}>
            <View style={styles.header}>
                <Feather name={'edit'} style={styles.headerIcon} />
                <Text style={styles.headerText}>Edit Todo</Text>
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={{ textAlign: "center", fontFamily: "Ubuntu-Regular", fontSize: 20 }}>You can edit your todo description here</Text>
                    <View
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            margin: 25,
                            borderRadius: 10
                        }}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={250}
                            onChangeText={text => setTodo(text)}
                            value={todo}
                            style={{ padding: 10, borderRadius: 10 }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Text style={{ color: "#ffff", fontFamily: "Ubuntu-Regular", fontSize: 18 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={handleUpdateTodo}>
                        <Text style={{ color: "#ffff", fontFamily: "Ubuntu-Regular", fontSize: 18 }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const onReduxState = ({ state }: any) => ({ state });
export default connect(onReduxState)(Edit);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header: {
        minHeight: 60,
        flexDirection: "row",
        backgroundColor: "#4287f5",
        height: "8%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    headerIcon: {
        fontSize: 30,
        color: '#ffff',
        position: "absolute",
        left: 20
    },
    footerIcon: {
        fontSize: 30,
        color: '#ffff'
    },
    footer: {
        minHeight: 60,
        padding: 5,
        flexDirection: "row",
        backgroundColor: "#4287f5",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center"
    },
    content: {
        flex: 8.4,
        height: '80%',
        marginHorizontal: 20,
        justifyContent: "center",

    },
    headerText: {
        color: "#ffff",
        fontSize: 20,
        fontFamily: "Ubuntu-Medium"
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: "#ffff"
    },
    list: {
        width: '100%',
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    todoText: {
        flex: 1,
        marginRight: 10,
    },
});