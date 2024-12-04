# Juntagrico List Generation

This is an addon for the [juntagrico](https://github.com/juntagrico/juntagrico) community gardens management platform using the [custom subs addon](https://github.com/juntagrico/juntagrico-custom-sub).

## Features
- Menu entry to generate lists
- Runs the two management commands `cs_generate_pack_list` and `cs_generate_depot_list`
- Indicates if the lists have been generated more than three days ago

## Installation
- Install `pip install -i https://test.pypi.org/simple/ juntagrico-list-gen`
- You might also add `juntagrico-list-gen` to your requirements
- Add `juntagrico_list_gen` to `INSTALLED_APPS` in your `settings.py`
- Add the url pattern `path("", include("juntagrico_list_gen.urls"))` to urls.py


## Todo
- Move to non-test pypi


## Development and publishing
- Create and activate a virtual environment
    - `python -m venv ~/.venv/jlg`
    - `source ~/.venv/jlg/bin/activate`
- Install dependencies, including build and publish dependencies (optional dependencies in pyproject.toml)
    - `pip install .[build]` Note that on zsh, include ticks: `pip install '.[build]'`
- Commit you changes. When your done, update the version in the pyproject.toml. It's recommended to to this as a separate, last commit with the message "bump version to x.x.x".
- Build the package
    - `python -m build`
- Make sure you have an api key with permissions to upload the package to pypi. 
- Upload the package to pypi
    - `twine upload --verbose -r testpypi dist/*`
    <br>Currently, this uploads to testpypi. TODO: Set up real pypi

