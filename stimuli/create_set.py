def split_text(text,n):
    words = text.split()
    chunks = []
    current_chunk = ''
    for word in words:
        
        if len(current_chunk) - current_chunk.count(' ')*0.7 + len(word) + 1 <= n:
            current_chunk += word + ' '
        else:
            chunks.append(current_chunk.strip()+'\\n')
            current_chunk = word + ' '
    if current_chunk:
        chunks.append(current_chunk.strip()+'\\n')
    return chunks

def create_sent_set(splitted_text, num_row):
   retVal = []
   for i in range(len(splitted_text)//num_row):   
      retVal.append('\n'.join(splitted_text[i*num_row:i*num_row+num_row]).strip())
   retVal.append('\n'.join(splitted_text[(i+1)*num_row:]).strip())
   return retVal

def print_out(text, n = 55):
    text = open(text,'r').read()
    text = split_text(text,n)
    for j in create_sent_set(text, 10):
        print('`'+j+'`,')
