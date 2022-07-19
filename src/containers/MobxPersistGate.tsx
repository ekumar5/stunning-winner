import AsyncStorage from '@react-native-community/async-storage';
import { persist } from 'mst-persist';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { rootStore } from '../mobx';
import { styled } from '../utils/styled';
import { ContainerProps } from './types';

const MobxPersistGate: React.FC<ContainerProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    persist('root', rootStore, {
      storage: AsyncStorage,
      jsonify: true,
    }).then(() => {
      console.log('state rehydrated');
      setLoading(false);
    });
  }, []);

  return loading ? (
    <CenteredContainer>
      <ActivityIndicator />
    </CenteredContainer>
  ) : (
    children
  );
};

const CenteredContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default MobxPersistGate;
