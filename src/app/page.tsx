"use client";
import { useState } from "react";
import Search from "@/components/common/Search";
import {
  Grid,
  Alert,
  Container,
  Typography,
  Pagination,
  CircularProgress
} from "@mui/material";
import { useCharacters } from "@/hooks";
import CharacterCard from "@/components/CharacterCard";
import CharacterDialog from "@/components/CharacterDialog";

import { Character } from "@/types";
import styles from "./page.module.scss";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [character, setCharacter] = useState<Character | null>(null);
  const { data, loading, error } = useCharacters(currentPage, search);

  const handleClose = () => {
    setOpen(false);
  };

  const onCardclick = (item: Character) => {
    setCharacter(item);
    setOpen(true);
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    setSearch(value);
  };

  const getTotalPages = (total: number | null) => {
    if (total) {
      const result = total / 10;
      return result ? Math.ceil(result) : 1;
    } else return 1;
  };

  return (
    <Container>
      <div className={styles.search}>
        <Search onChange={handleSearch} />
      </div>
      {loading && (
        <div className={styles.loader}>
          <CircularProgress size={70} sx={{ color: "#FFE81F" }} />
        </div>
      )}
      {error && (
        <Alert severity='error' style={{ position: "absolute", top: 0 }}>
          {error.message}
        </Alert>
      )}
      {data && data.results && data.results.length && !loading && (
        <>
          <Grid
            container
            spacing={2}
            marginTop={5}
            flexWrap='wrap'
            justifyContent='center'
          >
            {(data?.results as Character[]).map(
              (item: Character, index: number) => (
                <CharacterCard
                  data={item}
                  key={index}
                  handleClick={() => onCardclick(item)}
                />
              )
            )}
          </Grid>
          <div className={styles.paginationContainer}>
            <Pagination
              size='small'
              defaultPage={1}
              page={currentPage}
              onChange={handlePagination}
              count={getTotalPages(data && data.count)}
              className={styles.pagination}
              color='primary'
            />
          </div>
        </>
      )}
      {(!data?.results || !data?.results.length) && !loading && (
        <Typography variant='h6' gutterBottom color='white'>
          No results found.
        </Typography>
      )}
      <CharacterDialog open={open} onClose={handleClose} data={character} />
    </Container>
  );
}
