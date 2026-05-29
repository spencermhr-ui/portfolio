module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("stylesheet.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("script2.js");
  eleventyConfig.addPassthroughCopy("main_assets");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("projects");
  eleventyConfig.addPassthroughCopy("about");
  eleventyConfig.addPassthroughCopy("home");
};