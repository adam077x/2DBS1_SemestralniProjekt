import { Modal, Typography } from '@mui/material';
import StyledBox from '../misc/StyledBox';
import { useBoolean } from '@/hooks/useBoolean';
import MeasureForm from './MeasureForm';

const MeasureModal = ({
  id,
  measureModalOpened,
  onClose,
}: {
  id: number;
  onClose: () => void;
  measureModalOpened: boolean;
}) => {
  return (
    <Modal open={measureModalOpened} onClose={onClose}>
      <StyledBox>
        <Typography variant="h5">Vytvořit opatření</Typography>

        <MeasureForm id={id} onClose={onClose} />
      </StyledBox>
    </Modal>
  );
};

export default MeasureModal;
