from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in aate/__init__.py
from aate import __version__ as version

setup(
	name="test",
	version=version,
	description="Al Ansari Trading Enterprise",
	author="Mustafa Ahmad",
	author_email="developer@alansariglobal.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
