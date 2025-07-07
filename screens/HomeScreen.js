import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { strings } from '../strings';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const { Tiltels, Informations, Importants } = strings.arabic;

  const [modalVisibleImages, setModalVisibleImages] = useState(false);
  const [modalVisibleInfo, setModalVisibleInfo] = useState(false);
  const [modalVisibleReservation, setModalVisibleReservation] = useState(false);
  const [modalVisibleImportant, setModalVisibleImportant] = useState(false);

  const fieldImages = [
    require('../photos2app/images/FieldImg.jpg'),
    require('../photos2app/images/FieldImg2.jpg'),
    require('../photos2app/images/FieldImg4.jpg'),
    require('../photos2app/images/FIeldImg5.jpg'),
    require('../photos2app/images/FIeldImg6.jpg'),
    require('../photos2app/images/FIeldImg7.jpg'),
    require('../photos2app/images/FIeldImg8.jpg'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{Tiltels.title}</Text>
        <View style={styles.underline} />

        <ScrollView>

          {/* Info box */}
          <View style={styles.FieldImage}>
            <MaterialDesignIcons name="alert-circle" style={styles.imgInfo} />
            <Text style={styles.ImgInfoTxt}>معلومات هامة</Text>
            <TouchableOpacity onPress={() => setModalVisibleImportant(true)}>
              <Text style={styles.bookButton}>عرض</Text>
            </TouchableOpacity>
          </View>

          {/* Field image section */}
          <View style={styles.FieldImage}>
            <MaterialDesignIcons name="soccer-field" style={styles.imgInfo} />
            <Text style={styles.ImgInfoTxt}>{Informations.imgs}</Text>
            <TouchableOpacity onPress={() => setModalVisibleImages(true)}>
              <Text style={styles.bookButton}>{Informations.imgShow}</Text>
            </TouchableOpacity>
          </View>

          {/* Reservation section */}
          <View style={styles.FieldImage}>
            <MaterialDesignIcons name="calendar-month" style={styles.imgInfo} />
            <Text style={styles.ImgInfoTxt}>حجز تاريخ</Text>
            <TouchableOpacity onPress={() => setModalVisibleReservation(true)}>
              <Text style={styles.bookButton}>احجز الآن</Text>
            </TouchableOpacity>
          </View>

          {/* Important Info section
          <View style={styles.FieldImage}>
            <MaterialDesignIcons name="alert-circle" style={styles.imgInfo} />
            <Text style={styles.ImgInfoTxt}>معلومات هامة</Text>
            <TouchableOpacity onPress={() => setModalVisibleImportant(true)}>
              <Text style={styles.bookButton}>عرض</Text>
            </TouchableOpacity>
          </View> */}

        </ScrollView>
      </View>

      {/* Modal: Image Show */}
      <Modal
        visible={modalVisibleImages}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisibleImages(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{Informations.imgs}</Text>
          <ScrollView contentContainerStyle={styles.imageScroll}>
            {fieldImages.map((image, index) => (
              <View key={index} style={styles.imageFrame}>
                <Image source={image} style={styles.imageStyle} resizeMode="cover" />
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setModalVisibleImages(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>{Informations.closeBtn || 'إغلاق'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Modal: Important Info */}
      <Modal
        visible={modalVisibleImportant}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisibleImportant(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{Informations.InfoShow}</Text>
          <ScrollView>
            <Text style={{ fontSize: 18, padding: 10, textAlign: 'center' }}>
              {`${Informations.Info}
              
              
1. عند الحجز، يُفضل أخذ لقطة شاشة (screenshot) للحجز لتأكيده عند الوصول.

2. لا يوجد تأمين على اللاعبين أو الممتلكات داخل الملعب، لذلك الدخول على مسؤوليتكم الشخصية.

3. يرجى المحافظة على نظافة الملعب والمرافق المحيطة به، ورمي النفايات في الأماكن المخصصة.

4. الوقت المُحجوز يبدأ من لحظة الدخول وليس عند بدء اللعب، لذا يرجى الالتزام بالوقت المحدد.

5. أي أضرار تحدث للمرافق أو الممتلكات بسبب سوء الاستخدام، يتحمل المتسبب تكاليف الإصلاح.

6.  يرجى عدم التدخل في الملعب أثناء اللعب، وتجنب التدخل في الملعب أثناء اللعب.

7.  يرجى التواصل مع مدير الملعب في حالة وجود أي مشاكل أو استفسارات.                `}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginVertical: 20 }}>
  <TouchableOpacity
    onPress={() => Linking.openURL('tel:0535322328')}
    style={{ marginRight: 10, backgroundColor: '#25d366', borderRadius: 20, padding: 8 }}
  >
    <MaterialDesignIcons name="phone" size={24} color="#fff" />
  </TouchableOpacity>
  <Text style={{ fontSize: 18, padding: 10, textAlign: 'right' }}>{Informations.owner}</Text>
</View>

          </ScrollView>
          <TouchableOpacity onPress={() => setModalVisibleImportant(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>{Informations.closeBtn}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Modal: Reservation */}
      <Modal
        visible={modalVisibleReservation}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisibleReservation(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>حجز تاريخ</Text>
          <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 20 }}>
            سيتم إضافة خاصية الحجز قريبًا
          </Text>
          <TouchableOpacity onPress={() => setModalVisibleReservation(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>إغلاق</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: '#007AFF',
    marginTop: 8,
    marginBottom: 20,
  },
  FieldInfo: {
    width: screenWidth - 40,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  FieldImage: {
    width: screenWidth - 40,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bookButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: 10,
    width: 150,
    alignSelf: 'center',
  },
  imgInfo: {
    fontSize: 30,
    color: 'black',
    marginBottom: 8,
    textAlign: 'center',
  },
  ImgInfoTxt: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  InfoShowTxt: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  imageScroll: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageFrame: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
    width: screenWidth - 40,
    height: 220,
    backgroundColor: '#eee',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: 150,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  topCloseIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
});
