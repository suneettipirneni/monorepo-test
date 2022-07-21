import { ApiModel } from "@microsoft/api-extractor-model";
import path from "path";

export async function getStaticProps() {
  return {
    props: {
      foo: "bar",
    },
  };
}

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

export default function Item() {
  return <div>Hello world</div>;
}
