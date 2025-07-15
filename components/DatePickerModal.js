import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'expo-datepicker';

export default function DatePickerModal({ visible, onClose, onConfirm }) {
  const [date, setDate] = useState(new Date());

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>اختر التاريخ المناسب</Text>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          locale="ar"
        />
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>إلغاء</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => onConfirm(date)}>
            <Text style={styles.btnText}>تأكيد</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007AFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  btn: {
    flex: 1,
    backgroundColor: '#007AFF',
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
