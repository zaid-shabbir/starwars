import {
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";

import { usePlanet } from "@/hooks";
import { CharacterDialogProps } from "@/types";
import { extractIdFromUrl } from "@/helpers";
import styles from "./styles.module.scss";

const CharacterDialog: React.FC<CharacterDialogProps> = (
  props: CharacterDialogProps
) => {
  const { open, onClose, data } = props;
  const { data: planetData, loading } = usePlanet(
    extractIdFromUrl(data && data.homeworld)
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {data && (
          <>
            <DialogTitle>
              <Typography variant='h6'>{data.name}</Typography>
            </DialogTitle>
            <DialogContent>
              {planetData && (
                <div className={styles.container}>
                  <div>
                    <Typography variant='body1' fontWeight={700} gutterBottom>
                      Details
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Height: {parseInt(data.height) / 100} meters
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Mass: {data.mass} kg
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Date Added: {formatDate(data.created)}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Number of Films: {data.films.length}
                    </Typography>
                    <Typography variant='body2'>
                      Birth Year: {data.birth_year}
                    </Typography>
                  </div>
                  <div className={styles.homeworld}>
                    {loading && (
                      <CircularProgress
                        size={30}
                        color='info'
                        className={styles.loader}
                      />
                    )}
                    {!loading && (
                      <div>
                        <Typography
                          variant='body1'
                          fontWeight={700}
                          gutterBottom
                        >
                          Homeworld
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                          Name: {planetData.name}
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                          Terrain: {planetData.terrain}
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                          Climate: {planetData.climate}
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                          Number of Residents: {planetData.residents?.length}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} className={styles.close} color='info'>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default CharacterDialog;
