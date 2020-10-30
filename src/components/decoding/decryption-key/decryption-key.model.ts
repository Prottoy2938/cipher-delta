export interface Props {
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setEncKey: React.Dispatch<
    React.SetStateAction<{
      key: string;
      enabled: boolean;
    }>
  >;
  encKey: {
    key: string;
    enabled: boolean;
  };
}
