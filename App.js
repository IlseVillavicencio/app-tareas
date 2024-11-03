import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (tarea.trim() !== '') {
      setTareas([...tareas, { texto: tarea, completada: false }]);
      setTarea('');
    } else {
      alert('Por favor, escribe una tarea.');
    }
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  const toggleCompletada = (index) => {
    const nuevasTareas = tareas.map((t, i) =>
      i === index ? { ...t, completada: !t.completada } : t
    );
    setTareas(nuevasTareas);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.title}>Lista de Tareas</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={tarea}
            onChangeText={setTarea}
            placeholder="Escribe una tarea..."
          />
          <TouchableOpacity style={styles.addButton} onPress={agregarTarea}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.taskList}
          data={tareas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <CheckBox
                value={item.completada}
                onValueChange={() => toggleCompletada(index)}
                style={styles.checkbox}
              />
              <Text style={[styles.taskText, item.completada && styles.taskTextCompleted]}>
                {item.texto}
              </Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarTarea(index)}>
                <Text style={styles.deleteButtonText}>x</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '85%',
    maxWidth: 400,
    alignSelf: 'center', 
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
  },
  taskList: {
    flex: 1, // Ocupa el espacio para mostrar todas las tareas
    width: '87%', // Asegura que ocupe todo el ancho
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    paddingHorizontal: 10, // Espacio horizontal dentro de cada tarea
  },
  checkbox: {
    marginRight: 15,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f44336',
    marginLeft: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
});


