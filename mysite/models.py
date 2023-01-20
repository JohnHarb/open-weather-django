from django.db import models

class users(models.Model):
  username = models.CharField(max_length=20, primary_key=True)

class zips(models.Model):
  zipcode = models.CharField(max_length=10)
  us = models.ForeignKey(users, on_delete=models.CASCADE, default="default")
  