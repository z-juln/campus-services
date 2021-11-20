<template>
	<div @click.stop class="schedule_add">
		<div class="schedule_add_field">
			<van-field v-model="course" left-icon="label-o" placeholder="课程名称" />
			<van-field v-model="teacher" left-icon="user-o" placeholder="授课老师" />
			<van-field
				v-model="place"
				left-icon="location-o"
				placeholder="上课地点"
			/>
			<div>
				<van-cell
					icon="orders-o"
					block
					clickable
					@click="showWeeksPicker = true"
					>第{{ weeks[0] }} - {{ weeks[1] }}周</van-cell
				>
				<van-cell
					icon="clock-o"
					block
					clickable
					@click="showSectionPicker = true"
					>{{ sectionPicker[0].values[day - 1] }} 第{{ section[0] }} -
					{{ section[1] }}节</van-cell
				>
			</div>
			<van-cell icon="certificate">
				<van-radio-group v-model="type" direction="horizontal">
					<van-radio :name="2">单双周</van-radio>
					<van-radio :name="1">单周</van-radio>
					<van-radio :name="0">双周</van-radio>
				</van-radio-group></van-cell
			>
			<div class="schedule_add_buttons">
				<van-button block @click="toggle">取消</van-button>
				<van-button block @click="addData">添加</van-button>
			</div>
		</div>
		<div
			class="schedule_add_weeksPicker"
			ref="weeksPicker"
			v-if="showWeeksPicker"
		>
			<van-picker
				:columns="weeksPicker"
				show-toolbar
				@cancel="showWeeksPicker = false"
                @confirm="setWeeks"
			></van-picker>
		</div>
		<div
			class="schedule_add_sectionPickers"
			ref="sectionPickers"
			v-if="showSectionPicker"
		>
			<van-picker
				:columns="sectionPicker"
				show-toolbar
				@cancel="showSectionPicker = false"
                @confirm="setSection"
			></van-picker>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'AddCourse',
	data() {
		return {
			course: '',
			teacher: '',
			place: '',
			type: 2,
			section: [1, 2],
			day: 1,
			weeks: [1, 18],
			showWeeksPicker: false,
			showSectionPicker: false,
			weeksPicker: [
				{
					values: [
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
						20,
					],
				},
				{
					values: [
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
						20,
					],
                    defaultIndex:17
				},
			],
			sectionPicker: [
				{
					values: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				},
				{
					values: [
						'第一节',
						'第二节',
						'第三节',
						'第四节',
						'第五节',
						'第六节',
						'第七节',
						'第八节',
						'第九节',
						'第十节',
						'第十一节',
						'第十二节',
					],
				},
				{
					values: [
						'第一节',
						'第二节',
						'第三节',
						'第四节',
						'第五节',
						'第六节',
						'第七节',
						'第八节',
						'第九节',
						'第十节',
						'第十一节',
						'第十二节',
					],
				},
			],
		}
	},
	methods: {
		setWeeks(value) {
			this.weeks[0] = value[0]
			this.weeks[1] = value[1]
            this.showWeeksPicker = false
		},
		setSection(value) {
			let dayMap = {
				周一: 1,
				周二: 2,
				周三: 3,
				周四: 4,
				周五: 5,
				周六: 6,
				周日: 7,
			}
			let sectionMap = {
				第一节: 1,
				第二节: 2,
				第三节: 3,
				第四节: 4,
				第五节: 5,
				第六节: 6,
				第七节: 7,
				第八节: 8,
				第九节: 9,
				第十节: 10,
				第十一节: 11,
				第十二节: 12,
			}
            this.day = dayMap[value[0]]
            this.section[0] = sectionMap[value[1]]
            this.section[1] = sectionMap[value[2]]
            this.showSectionPicker = false
		},
        addData() {
            axios.post('http://42.193.247.131:3000/timetable/post',{
                name:this.course,
                teacher:this.teacher,
                weeks:this.weeks,
                place:this.place,
                section:this.section,
                day:this.day,
                remark:this.type
            }).then((res)=>{
                
            })
        }
	},
    props:['toggle'],
    mounted() {
    }
}
</script>

<style scoped>
.schedule_add {
	border-radius: 2vw;
	overflow: hidden;
	position: absolute;
	width: 80vw;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
}
.schedule_add_field {
}
.schedule_add_buttons {
	display: flex;
}
.schedule_add_weeksPicker {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.schedule_add_sectionPickers {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
</style>
