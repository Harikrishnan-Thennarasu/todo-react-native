import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { store } from './provider/store';
import { COMPLETE_ONE_TODO, DELETE_ONE_TODO, PENDING_ONE_TODO, SAVE_TODOS } from './provider/action';
import moment from 'moment';





function Home({ navigation, state }: any) {
    const { allTodos } = state;
    const [todo, setTodo]: any = useState('');
    const handleAddTodo = () => {
        if (todo) {
            const newTodo = {
                id: moment().format(),
                todo: todo,
                createdAt: moment().format(),
                status: "PENDING"
            };
            store.dispatch({ type: SAVE_TODOS, data: [...allTodos, newTodo] });

            setTodo('');
        }
    };

    const handleDeleteTodo = (id: string) => {
        store.dispatch({ type: DELETE_ONE_TODO, id });
    };


    const handleToEditTodo = (todo: any) => {
        navigation.navigate('EDIT', todo)
    };
    const handleTodoPending = (id: string) => {
        store.dispatch({ type: PENDING_ONE_TODO, id });
    }

    const handleTodoComplete = (id: string) => {
        store.dispatch({ type: COMPLETE_ONE_TODO, id });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Octicons name={'checklist'} style={styles.headerIcon} />
                <Text style={styles.headerText}>My Todo List</Text>
            </View>
            <View style={styles.content}>
                {allTodos?.length > 0 ?
                    <FlatList
                        data={allTodos}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", marginVertical: 10 }}>
                                <View style={{ flex: 1.5, justifyContent: "center", alignItems: "flex-start" }}>
                                    {item?.status == 'COMPLETED' ?
                                        <TouchableOpacity onPress={() => handleTodoPending(item.id)}>
                                            <AntDesign
                                                name={"checksquare"}
                                                style={{ color: '#4aa814', fontSize: 30, textAlign: "left" }}
                                            />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => handleTodoComplete(item.id)}>
                                            <AntDesign
                                                name={"checksquareo"}
                                                style={{ color: "#8f8f8f", fontSize: 30, textAlign: "left" }}
                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <View style={styles.todo}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Text style={styles.todoText} numberOfLines={1} >{item.todo}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleToEditTodo(item)}
                                        >
                                            <Feather name={'edit'} style={{ color: "#4287f5", fontSize: 20 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDeleteTodo(item.id)}
                                            style={{ marginLeft: 10 }}
                                        >
                                            <MaterialCommunityIcons name={'delete'} style={{ color: "#4287f5", fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginTop: 10,
                                            alignItems: "center"
                                        }}>
                                        <Text style={{ textTransform: "capitalize", fontFamily: "Ubuntu-Medium" }}>{item.status}</Text>
                                        <Text style={{ fontFamily: "Ubuntu-Regular" }}>{moment(item.createdAt).calendar()}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    /> :
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <AntDesign name={'frowno'} style={{ fontSize: 50, marginBottom: 20, color: '#000000' }} />
                        <Text style={{ fontFamily: "Ubuntu-Medium", color: '#000000' }}>There is no todos</Text>
                    </View>
                }
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 8.5, justifyContent: "center", alignContent: "center" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add todo"
                        onChangeText={text => setTodo(text)}
                        value={todo}
                        multiline
                    />
                </View>
                <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleAddTodo} >
                        <Ionicons name={'add-circle'} style={styles.footerIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const onReduxState = ({ state }: any) => ({ state });
export default connect(onReduxState)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
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
        padding:5,
        flexDirection: "row",
        backgroundColor: "#4287f5",
        width: "100%"
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
        flex: 9,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    todoText: {
        flex: 1,
        marginRight: 10,
        fontFamily: "Ubuntu-Regular"
    },
});