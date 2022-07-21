import { ApiModel } from "@microsoft/api-extractor-model";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import path from "path";
import config from "../../packageConfig.json";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const model = new ApiModel();
  console.log(process.cwd());
  const pkg = model.loadPackage(
    path.join(process.cwd(), "docs", "foo.api.json")
  );

  const entry = pkg?.entryPoints[0]!;

  const item = entry.findMembersByName(params!.slug as string)[0]!;

  return {
    props: {
      item: item.displayName,
    },
  };
};

export async function getStaticPaths() {
  const model = new ApiModel();

  const paths = config.packages.flatMap((name) => {
    const pkg = model.loadPackage(
      path.join(process.cwd(), "docs", `${name}.api.json`)
    );

    const entry = pkg?.entryPoints[0]!;

    return entry.members.map((item) => {
      return `/docs/${item.displayName}`;
    });
  });

  return {
    paths,
    fallback: true,
  };
}

export default function Item(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <div>{props.item}</div>;
}
