import { Card, Typography, CardMedia } from "@mui/material";

import { stringToHexColor } from "@/helpers";
import { CharacterCardProps } from "@/types";
import styles from "./styles.module.css";

const CharacterCard: React.FC<CharacterCardProps> = (
  props: CharacterCardProps
) => {
  const { data, handleClick } = props;
  const color = stringToHexColor(data.species[0] ? data.species[0] : data.name);

  return (
    <div className={styles.cardContainer}>
      <Card
        style={{ borderColor: color }}
        className={styles.card}
        onClick={handleClick}
      >
        <CardMedia
          sx={{ height: "100%", width: "100%", objectFit: "contain" }}
          image={data.imageUrl}
        />
      </Card>
      <Typography
        color={color}
        variant='body2'
        marginTop='4px'
        fontWeight={500}
        textAlign='center'
      >
        {data.name}
      </Typography>
    </div>
  );
};

export default CharacterCard;
