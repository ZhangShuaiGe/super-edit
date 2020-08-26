
import $random from '@/utils/random';
 const processdata={
      prand:$random(true,20,20),
      condition:{},
      conditionList:[
        {
          prand:$random(true,20,20),
          conditionType:'yes',
          conditionList:[],
          
        },
        {
          prand:$random(true,20,20),
          conditionType:'no',
          conditionList:[],
        }
      ],
    }

export default processdata;