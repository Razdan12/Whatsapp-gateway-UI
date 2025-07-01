export type Option = {
  label: string;
  value: string;
};

export type Payment = Option & {
  id: string;
  price: number;
  img: string;
  active: boolean;
};
