import { contract } from "..";

export function registration(sender) {
  console.log(
    contract.methods
      .regUser()
      .send({ from: sender })
      .then((data) => data)
  );
}
