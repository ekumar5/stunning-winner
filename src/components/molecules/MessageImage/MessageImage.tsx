import React, { useState } from 'react';
import { MessageImageProps } from 'react-native-gifted-chat/lib/MessageImage';
import { IChatMessage } from 'react-native-gifted-chat/lib/Models';
import { Image, StyledLightbox } from './MessageImage.styles';

const MessageImage = ({ currentMessage }: MessageImageProps<IChatMessage>) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <StyledLightbox
      onOpen={() => setLightboxOpen(true)}
      willClose={() => setLightboxOpen(false)}>
      <Image
        source={{ uri: currentMessage?.image }}
        resizeMode={lightboxOpen ? 'contain' : 'cover'}
      />
    </StyledLightbox>
  );
};

export default MessageImage;
