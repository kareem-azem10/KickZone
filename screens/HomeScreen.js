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
  Alert,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { strings } from '../strings';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const { Tiltels, Informations, Importants } = strings.arabic;

  const [modalVisibleImages, setModalVisibleImages] = useState(false);
  const [modalVisibleInfo, setModalVisibleInfo] = useState(false);
  const [modalVisibleReservation, setModalVisibleReservation] = useState(false);
  const [modalVisibleImportant, setModalVisibleImportant] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showHourModal, setShowHourModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  // مودال اسم صاحب الحجز الجديد
  const [showNameModal, setShowNameModal] = useState(false);
  const [reservationName, setReservationName] = useState('');

  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  // إضافة رقم الحجز العشوائي
  const [reservationNumber, setReservationNumber] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // هنا تم تعديل handleConfirm لإضافة تنبيه عند اختيار تاريخ منتهي الصلاحية
  const handleConfirm = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // تصفير الوقت لتجاهل الوقت والتركيز على التاريخ فقط

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      Alert.alert(
        'تنبيه',
        'التاريخ الذي اخترته منتهي الصلاحية. الرجاء اختيار تاريخ صحيح.',
        [{ text: 'حسناً', onPress: () => {} }]
      );
      hideDatePicker();
      return;
    }

    setSelectedDate(date);
    setSelectedHour(null);
    setReservationConfirmed(false);
    setReservationName('');
    setReservationNumber(null);
    hideDatePicker();
    setTimeout(() => setShowHourModal(true), 300);
  };

  // عند تأكيد اختيار الساعة
  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    setShowHourModal(false);
    setShowNameModal(true); // افتح مودال الاسم بعد اختيار الساعة
  };

  // عند تأكيد اسم صاحب الحجز
  const handleNameConfirm = async () => {
    if (!reservationName.trim()) return;

    // توليد رقم حجز عشوائي 3 أرقام
    const randomNum = Math.floor(100 + Math.random() * 900);
    setReservationNumber(randomNum);

    setReservationConfirmed(true);

    try {
      const db = getFirestore(app);
      await addDoc(collection(db, 'reservations'), {
        date: selectedDate.toISOString().split('T')[0],
        hour: `${selectedHour}:00 - ${selectedHour + 2 === 24 ? '00' : selectedHour + 2 + ':00'}`,
        name: reservationName.trim(),
        reservationNumber: randomNum,
        timestamp: new Date().toISOString(),
      });
      console.log('Reservation sent to Firestore');
    } catch (error) {
      console.error('Error sending reservation:', error);
    }
  };

  const handleCloseAll = () => {
    setShowHourModal(false);
    setShowNameModal(false);
    setModalVisibleReservation(false);
    setSelectedDate(null);
    setSelectedHour(null);
    setReservationName('');
    setReservationConfirmed(false);
    setReservationNumber(null);
  };

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

            {/* زر الحجز مع التنبيه */}
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'تنبيه',
                  'تأكد بأنك قرأت كل المعلومات الهامة قبل الحجز.',
                  [
                    {
                      text: 'إلغاء',
                      style: 'cancel',
                    },
                    {
                      text: 'متابعة',
                      onPress: () => setModalVisibleReservation(true),
                    },
                  ]
                )
              }
            >
              <Text style={styles.bookButton}>احجز الآن</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

      {/* مودال الصور */}
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

      {/* مودال المعلومات الهامة */}
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
  
  7.  يرجى التواصل مع مدير الملعب في حالة وجود أي مشاكل أو استفسارات.`}
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

      {/* مودال الحجز */}
      <Modal
        visible={modalVisibleReservation}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisibleReservation(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>حجز تاريخ</Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={{ backgroundColor: '#007AFF', padding: 14, borderRadius: 8, marginVertical: 20 }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>احجز الآن!</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="ar"
          />

          {/* مودال اختيار الساعة */}
          <Modal
            visible={showHourModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowHourModal(false)}
          >
            <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', alignItems:'center' }}>
              <View style={{ backgroundColor:'#fff', borderRadius:16, padding:24, width:320 }}>
                <Text style={{ fontSize:18, fontWeight:'bold', color:'#007AFF', textAlign:'center', marginBottom:16 }}>
                  اختر ساعة البداية
                </Text>
                {[14,16,18,20,22].map((hour, idx) => {
                  const label = `${hour}:00 - ${hour+2 === 24 ? '00' : hour+2+':00'}`;
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleHourSelect(hour)}
                      style={{
                        backgroundColor: '#f0f0f0',
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                      }}
                    >
                      <Text style={{ color: '#333', fontSize: 16, textAlign: 'center' }}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity onPress={() => setShowHourModal(false)} style={[styles.closeButton, {width:'100%', marginTop:10}]}>
                  <Text style={styles.closeButtonText}>إلغاء</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* مودال إدخال اسم صاحب الحجز */}
          <Modal
            visible={showNameModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowNameModal(false)}
          >
            <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', alignItems:'center' }}>
              <View style={{ backgroundColor:'#fff', borderRadius:16, padding:24, width:320 }}>
                {!reservationConfirmed ? (
                  <>
                    <Text style={{ fontSize:18, fontWeight:'bold', color:'#007AFF', textAlign:'center', marginBottom:16 }}>
                      أدخل اسم صاحب الحجز
                    </Text>
                    <Text style={{ fontSize:18, fontWeight:'bold', color:'red', textAlign:'center', marginBottom:16 }}>
                      *ارجو ادخال الاسم الثلاثي لصاحب الحجز
                    </Text>
                    <TextInput
                      placeholder="اسم صاحب الحجز"
                      value={reservationName}
                      onChangeText={setReservationName}
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 16,
                        marginBottom: 10,
                        textAlign: 'right',
                        color: '#333',
                      }}
                    />
                    <TouchableOpacity
                      disabled={!reservationName.trim()}
                      onPress={handleNameConfirm}
                      style={{
                        backgroundColor: reservationName.trim() ? '#007AFF' : '#ccc',
                        padding: 14,
                        borderRadius: 8,
                        marginVertical: 10,
                        opacity: reservationName.trim() ? 1 : 0.7,
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>تأكيد الحجز</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowNameModal(false)} style={[styles.closeButton, {width:'100%', marginTop:10}]}>
                      <Text style={styles.closeButtonText}>إلغاء</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={{alignItems:'center'}}>
                    <Text style={{ fontSize: 20, color: 'green', fontWeight:'bold', marginBottom: 12 }}>تم الحجز بنجاح!</Text>
                    <Text style={{ fontSize: 16, color: '#333', marginBottom: 6 }}>
                      التاريخ: {selectedDate && selectedDate.toLocaleDateString()}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#333', marginBottom: 12 }}>
                      الساعة: {selectedHour && `${selectedHour}:00 - ${selectedHour+2 === 24 ? '00' : selectedHour+2+':00'}`}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#333', marginBottom: 12 }}>
                      الاسم: {reservationName}
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                      رقم الحجز: {reservationNumber}
                    </Text>
                    <TouchableOpacity onPress={handleCloseAll} style={{backgroundColor:'#007AFF',padding:10,borderRadius:8, marginTop: 15}}>
                      <Text style={{color:'#fff',fontWeight:'bold'}}>إغلاق</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>

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
