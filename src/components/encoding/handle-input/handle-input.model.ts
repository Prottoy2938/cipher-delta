export interface Props {
  setUserContent: React.Dispatch<React.SetStateAction<string>>;
  skip: number;
  userContent: string;
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
