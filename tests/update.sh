for i in 1.*
do
  cd $i
  ln -fs ../*.html .
  cd ..
done
