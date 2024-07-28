from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class Category(models.Model):
    category= models.CharField(max_length=64)
    value = models.IntegerField(default=1, blank=True, null=True)
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=1000)
  
    def __str__(self):
        return f"{self.category}"
    
class Score(models.Model):
    category= models.ForeignKey(Category, on_delete=models.CASCADE,  blank=True, null = True , related_name="score_category")
    score = models.IntegerField(default=1, blank=True, null=True)
    difficulty = models.CharField(max_length=64)
    total_questions = models.IntegerField(default=1, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE,  blank=True, null = True , related_name="user_score")

  
    def __str__(self):
        return f"{self.user} in {self.category} level {self.difficulty}"