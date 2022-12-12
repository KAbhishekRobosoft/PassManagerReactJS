import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Success} from '../components/SuccessComponent';
import {setInitialState} from '../redux/MileStoneSlice';

export const BookingSuccess = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.milestone.initialState)
  return (
    <Success
      greet="Congratulations!"
      text2="Your booking has been confirmed"
      onPress={() => {
        navigation.navigate('Garage');
        dispatch(setInitialState(state));
      }}
      Press={() => navigation.goBack()}
    />
  );
};
