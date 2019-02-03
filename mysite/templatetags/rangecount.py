
from django import template

register = template.Library()

@register.filter(name='rangecount')
def times(number):
    return range(number)
