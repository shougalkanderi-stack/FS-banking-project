import { FontAwesome5 } from '@expo/vector-icons';
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const payments = [
  {
    id: '1',
    title: 'Education Fees',
    icon: 'graduation-cap',
    color: '#38BDF8'
  },
  {
    id: '2',
    title: 'Telecom Bills',
    icon: 'phone-square-alt',
    color: '#38BDF8'
  }
];

const Payments = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.subtitle}>Manage your payments</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paymentsGrid}>
          {payments.map((payment) => (
            <TouchableOpacity 
              key={payment.id} 
              style={styles.paymentCard}
              onPress={() => {}}
            >
              <View style={styles.iconContainer}>
                <FontAwesome5 
                  name={payment.icon} 
                  size={24} 
                  color={payment.color} 
                />
              </View>
              <Text style={styles.paymentTitle}>{payment.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4A6E',
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  scrollView: {
    flex: 1,
  },
  paymentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  paymentCard: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Payments; 