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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff", justifyContent: "space-between" }}>
            <View style={styles.header}>
                <Feather name={'edit'} style={styles.headerIcon} />
                <Text style={styles.headerText}>Edit Todo</Text>
            </View>
            <View>
                <Text style={{ textAlign: "center", fontFamily: "Ubuntu-Regular", fontSize: 20 }}>You can change your todo here</Text>
                <View
                    style={{
                        borderColor: '#ccc',
                        borderWidth: 1,
                        margin: 25,

                    }}>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={250}
                        onChangeText={text => setTodo(text)}
                        value={todo}
                        style={{ margin: 20, height: 400 }}
                    />
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {route?.params?.status == 'PENDING' ?
                    <TouchableOpacity onPress={handleTodoComplete} style={{ height: 50, width: '60%', backgroundColor: "#4287f5", borderRadius: 5, justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Ubuntu-Regular", textAlign: "center", color: "#ffff" }}>Click To Complete</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={handleTodoAgain} style={{ height: 50, width: '60%', backgroundColor: "#4287f5", borderRadius: 5, justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Ubuntu-Regular", textAlign: "center", color: "#ffff" }}>Click To Do Again</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                <View>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Text style={{ color: "#4287f5", fontFamily: "Ubuntu-Regular", fontSize: 18 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={handleUpdateTodo}>
                        <Text style={{ color: "#4287f5", fontFamily: "Ubuntu-Regular", fontSize: 18 }}>Update</Text>
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
        flexDirection: "row",
        backgroundColor: "#4287f5",
        height: "8%",
        width: "100%"
    },
    content: {
        height: '80%',
        padding: 20

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