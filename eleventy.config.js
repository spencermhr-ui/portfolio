module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("stylesheet.css");
  eleventyConfig.addPassthroughCopy("home/script.js");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("main_assets");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("projects");
  eleventyConfig.addPassthroughCopy("projects/my-digital-home/content/MyDigitalHome.mp4");
  eleventyConfig.addPassthroughCopy("home");
  eleventyConfig.addPassthroughCopy("illustration");
  eleventyConfig.addPassthroughCopy("illustration/content");
  eleventyConfig.addPassthroughCopy("home/projects");
};