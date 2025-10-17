import styled from "styled-components/native";
import { COLORS } from "../constants";

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BACKGROUND.PRIMARY};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${COLORS.TEXT.PRIMARY};
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.TEXT.SECONDARY};
  margin-bottom: 30px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: 12px;
`;

const StyledButton = styled.TouchableOpacity<{
  $color?: string;
  $disabled?: boolean;
}>`
  background-color: ${(props: { $disabled?: boolean; $color?: string }) =>
    props.$disabled
      ? COLORS.BUTTONS.DISABLED
      : props.$color || COLORS.BUTTONS.DEFAULT};
  padding: 15px 30px;
  border-radius: 8px;
  width: 250px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props: { $disabled?: boolean }) =>
    props.$disabled ? 0.1 : 0.25};
  shadow-radius: 3.84px;
  elevation: 5;
  opacity: ${(props: { $disabled?: boolean }) => (props.$disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: ${COLORS.TEXT.WHITE};
  font-size: 16px;
  font-weight: 600;
`;

const ModalContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BACKGROUND.MODAL};
`;

const ModalHeader = styled.View`
  background-color: ${COLORS.BACKGROUND.WHITE};
  padding: 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  padding-top: 50px;
`;

const CloseButton = styled.TouchableOpacity`
  align-self: flex-start;
`;

const CloseButtonText = styled.Text`
  font-size: 18px;
  color: ${COLORS.TEXT.LINK};
  font-weight: 500;
`;

export {
  Container,
  Title,
  Subtitle,
  ButtonContainer,
  StyledButton,
  ButtonText,
  ModalContainer,
  ModalHeader,
  CloseButton,
  CloseButtonText,
};
