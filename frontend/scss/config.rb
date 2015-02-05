# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)
css_dir = File.join(dir, '..', 'app', 'assets', 'css')

# Look for any *.scss files in same directory as this file
sass_path    = dir
# Place compiled *.css files in css_dir
css_path     = css_dir
output_style = :expanded
environment  = :development

