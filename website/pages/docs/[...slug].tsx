import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import path from "path";
import config from "../../packageConfig.json";
import { ApiModel } from "../../util";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log("static props");
  const model = new ApiModel();
  // console.log(model.packages.length);
  // if (!model.packages.length) {
  //   console.log("loading model...");
  //   for (const packageName of config.packages) {
  //     model.loadPackage(
  //       path.join(process.cwd(), "docs", `${packageName}.api.json`)
  //     );
  //   }
  // }

  // const [packageName, itemName] = params!.slug as [string, string];

  // const pkg = model.tryGetPackageByName(packageName);
  // const entry = pkg?.entryPoints[0]!;
  // const item = entry.findMembersByName(itemName as string)[0]!;

  // return {
  //   props: {
  //     // @ts-ignore
  //     item: item.displayName ?? item.name,
  //   },
  // };

  return {
    props: {
      item: "test",
    },
  };
};

export async function getStaticPaths() {
  // console.log("static paths");
  // const model = new ApiModel();
  // // First generate paths on-the-fly for our current branch.
  // for (const packageName of config.packages) {
  //   model.loadPackage(
  //     path.join(process.cwd(), "docs", `${packageName}.api.json`)
  //   );
  // }

  // const paths = model.packages.flatMap((pkg) => {
  //   return pkg.entryPoints[0]!.members.map((member) => {
  //     return `/docs/${pkg.displayName.replace("@discordjs/", "")}/${
  //       member.displayName
  //     }`;
  //   });
  // });

  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function Item(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <div>{props.item}</div>;
}
