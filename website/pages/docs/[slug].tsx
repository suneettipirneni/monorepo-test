import { ApiModel } from "@microsoft/api-extractor-model";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import path from "path";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const model = new ApiModel();
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
  console.log("test");

  const model = new ApiModel();
  const pkg = model.loadPackage(
    path.join(process.cwd(), "docs", "foo.api.json")
  );

  const entry = pkg.entryPoints[0]!;

  return {
    paths: entry.members.map((member) => `/docs/${member.displayName}`),
    fallback: true,
  };
}

export default function Item(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <div>{props.item}</div>;
}
