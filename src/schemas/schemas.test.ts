import type z from "zod";
import { blogSchema } from "./schemas";

type BlogPost = z.infer<typeof blogSchema>;

const valid: BlogPost = {
  title: "I'm a Blog Title!",
  description: "This is a description of a blog post.",
  pubDatetime: "2026-06-21T20:19:22Z",
  author: "Joey Guillaume",
  featured: false,
  draft: false,
  tags: ["test"],
};

const removeFrontmatterProperty = (frontmatter: BlogPost, property: string) => {
  // Generate a deep copy of the object.
  const clonedFrontmatter: any = structuredClone(frontmatter);

  // Remove the desired property.
  delete clonedFrontmatter[property];

  return clonedFrontmatter;
};

describe("The schema for a Blog Post should...", () => {
  it("Accept a post with valid Astro frontmatter.", () => {
    expect(blogSchema.safeParse(valid).success).toBe(true);
  });

  it("Reject a post without a title.", () => {
    const frontmatterWithoutTitle = removeFrontmatterProperty(valid, "title");

    expect(blogSchema.safeParse(frontmatterWithoutTitle).success).toBe(false);
  });

  it("Reject a post without a description.", () => {
    const frontmatterWithoutDescription = removeFrontmatterProperty(
      valid,
      "description",
    );

    expect(blogSchema.safeParse(frontmatterWithoutDescription).success).toBe(
      false,
    );
  });

  it("Reject a post without a publication date.", () => {
    const frontmatterWithoutPubDatetime = removeFrontmatterProperty(
      valid,
      "pubDatetime",
    );

    expect(blogSchema.safeParse(frontmatterWithoutPubDatetime).success).toBe(
      false,
    );
  });

  it("Reject a post without any tags.", () => {
    const frontmatterWithoutTags = removeFrontmatterProperty(valid, "tags");

    expect(blogSchema.safeParse(frontmatterWithoutTags).success).toBe(false);
  });

  it("Reject a post with invalid tags ", () => {
    const frontmatterWithInvalidTags = {
      ...structuredClone(valid),
      tags: "invalidTagStructure",
    };

    expect(blogSchema.safeParse(frontmatterWithInvalidTags).success).toBe(
      false,
    );
  });

  it("Should specify 'Joey Guillaume' as the author when no author is provided.", () => {
    const frontmatterWithoutAuthor: any = removeFrontmatterProperty(
      valid,
      "author",
    );

    // Ensure that it's valid.
    expect(blogSchema.safeParse(frontmatterWithoutAuthor).success).toBe(true);

    // Ensure that it contains my name.
    expect(
      blogSchema.safeParse(frontmatterWithoutAuthor).data?.author,
    ).toContain("Joey Guillaume");
  });

  it("Should allow posts to indicate 'featured' status.", () => {
    const frontmatterWithFeatured = {
      ...structuredClone(valid),
      featured: true,
    };

    // Ensure that it's valid.
    expect(blogSchema.safeParse(frontmatterWithFeatured).success).toBe(true);

    // Ensure that featured is true.
    expect(blogSchema.safeParse(frontmatterWithFeatured).data?.featured).toBe(
      true,
    );
  });

  it("'featured' status should be false by default.", () => {
    const frontmatterWithoutFeatured = removeFrontmatterProperty(
      valid,
      "featured",
    );

    // Ensure that it's valid.
    expect(blogSchema.safeParse(frontmatterWithoutFeatured).success).toBe(true);

    // Ensure that featured is false.
    expect(blogSchema.safeParse(frontmatterWithoutFeatured).data?.draft).toBe(
      false,
    );
  });

  it("Should allow posts to indicate 'draft' status.", () => {
    const frontmatterWithDraft = {
      ...structuredClone(valid),
      draft: true,
    };

    // Ensure that it's valid.
    expect(blogSchema.safeParse(frontmatterWithDraft).success).toBe(true);

    // Ensure that featured is true.
    expect(blogSchema.safeParse(frontmatterWithDraft).data?.draft).toBe(true);
  });

  it("'draft' status should be false by default.", () => {
    const frontmatterWithoutDraft = removeFrontmatterProperty(valid, "draft");

    // Ensure that it's valid.
    expect(blogSchema.safeParse(frontmatterWithoutDraft).success).toBe(true);

    // Ensure that featured is false.
    expect(blogSchema.safeParse(frontmatterWithoutDraft).data?.draft).toBe(
      false,
    );
  });
});
