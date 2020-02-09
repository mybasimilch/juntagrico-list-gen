from django.db import models


class ListGeneration(models.Model):
    generating = models.BooleanField(default=False)
